from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Database collections
hero_collection = db.hero
trainings_collection = db.trainings
training_videos_collection = db.training_videos
about_collection = db.about
statistics_collection = db.statistics
social_links_collection = db.social_links
newsletter_collection = db.newsletter
testimonials_collection = db.testimonials