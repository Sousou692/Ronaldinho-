from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

# Hero Section Model
class HeroStats(BaseModel):
    trophees: int
    matchs: int
    buts: int
    ballonOr: int

class Hero(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    subtitle: str
    description: str
    image: str
    stats: HeroStats
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Training Models
class Training(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nom: str
    duree: str
    description: str
    exercices: List[str]
    image: str
    ordre: int
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TrainingVideo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    titre: str
    description: str
    url: str
    miniature: str
    duree: str
    category: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

# About Section Models
class CareerStep(BaseModel):
    periode: str
    club: str
    description: str
    logo: Optional[str] = None

class Quality(BaseModel):
    nom: str
    description: str

class MomentMarquant(BaseModel):
    annee: str
    evenement: str
    description: str

class About(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    quote: str
    biographie: str
    carriere: List[CareerStep]
    qualites: List[Quality]
    momentsMarquants: List[MomentMarquant]
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Statistics Models
class Records(BaseModel):
    matchs: int
    buts: int
    passes: int
    trophees: int

class Club(BaseModel):
    nom: str
    periode: str
    matchs: int
    buts: int
    logo: Optional[str] = None

class Statistics(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    records: Records
    clubs: List[Club]
    titres: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Social Links Model
class SocialLink(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nom: str
    url: str
    icon: str
    ordre: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Newsletter Model
class NewsletterSubscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    active: bool = True

class NewsletterCreate(BaseModel):
    email: str

# Testimonials Model
class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nom: str
    message: str
    pays: str
    date: datetime = Field(default_factory=datetime.utcnow)
    approved: bool = False

class TestimonialCreate(BaseModel):
    nom: str
    message: str
    pays: str