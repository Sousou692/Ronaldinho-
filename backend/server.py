from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
from typing import List

# Import models and database
from models import (
    Hero, Training, TrainingVideo, About, Statistics, SocialLink,
    NewsletterSubscription, NewsletterCreate, Testimonial, TestimonialCreate
)
from database import (
    hero_collection, trainings_collection, training_videos_collection,
    about_collection, statistics_collection, social_links_collection,
    newsletter_collection, testimonials_collection
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(title="Ronaldinho API", description="API for Ronaldinho website")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Health check
@api_router.get("/")
async def root():
    return {"message": "Ronaldinho API is running!", "status": "healthy"}

# Hero endpoint
@api_router.get("/hero")
async def get_hero():
    """Get hero section data"""
    try:
        hero = await hero_collection.find_one({}, {"_id": 0})
        if not hero:
            raise HTTPException(status_code=404, detail="Hero data not found")
        return hero
    except Exception as e:
        logger.error(f"Error fetching hero data: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Training endpoints
@api_router.get("/trainings")
async def get_trainings():
    """Get all training routines"""
    try:
        trainings = await trainings_collection.find({}, {"_id": 0}).sort("ordre", 1).to_list(1000)
        return trainings
    except Exception as e:
        logger.error(f"Error fetching trainings: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/training-videos")
async def get_training_videos():
    """Get all training videos"""
    try:
        videos = await training_videos_collection.find({}, {"_id": 0}).to_list(1000)
        return videos
    except Exception as e:
        logger.error(f"Error fetching training videos: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# About endpoint
@api_router.get("/about")
async def get_about():
    """Get about section data"""
    try:
        about = await about_collection.find_one({}, {"_id": 0})
        if not about:
            raise HTTPException(status_code=404, detail="About data not found")
        return about
    except Exception as e:
        logger.error(f"Error fetching about data: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Statistics endpoint
@api_router.get("/statistics")
async def get_statistics():
    """Get statistics data"""
    try:
        stats = await statistics_collection.find_one({}, {"_id": 0})
        if not stats:
            raise HTTPException(status_code=404, detail="Statistics data not found")
        return stats
    except Exception as e:
        logger.error(f"Error fetching statistics: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Social links endpoint
@api_router.get("/social-links")
async def get_social_links():
    """Get social media links"""
    try:
        links = await social_links_collection.find({}, {"_id": 0}).sort("ordre", 1).to_list(1000)
        return links
    except Exception as e:
        logger.error(f"Error fetching social links: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Newsletter endpoints
@api_router.post("/newsletter")
async def subscribe_newsletter(subscription: NewsletterCreate):
    """Subscribe to newsletter"""
    try:
        # Check if email already exists
        existing = await newsletter_collection.find_one({"email": subscription.email})
        if existing:
            raise HTTPException(status_code=400, detail="Email already subscribed")
        
        # Create new subscription
        new_subscription = NewsletterSubscription(email=subscription.email)
        await newsletter_collection.insert_one(new_subscription.dict())
        
        return {"message": "Successfully subscribed to newsletter", "email": subscription.email}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error subscribing to newsletter: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/newsletter/count")
async def get_newsletter_count():
    """Get newsletter subscribers count"""
    try:
        count = await newsletter_collection.count_documents({"active": True})
        return {"count": count}
    except Exception as e:
        logger.error(f"Error getting newsletter count: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Testimonials endpoints
@api_router.get("/testimonials")
async def get_testimonials():
    """Get approved testimonials"""
    try:
        testimonials = await testimonials_collection.find(
            {"approved": True}, 
            {"_id": 0}
        ).sort("date", -1).limit(20).to_list(20)
        return testimonials
    except Exception as e:
        logger.error(f"Error fetching testimonials: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/testimonials")
async def create_testimonial(testimonial: TestimonialCreate):
    """Create new testimonial (requires approval)"""
    try:
        new_testimonial = Testimonial(**testimonial.dict())
        await testimonials_collection.insert_one(new_testimonial.dict())
        
        return {
            "message": "Testimonial submitted successfully. It will be reviewed before publication.",
            "id": new_testimonial.id
        }
    except Exception as e:
        logger.error(f"Error creating testimonial: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Include the router in the main app
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)