import asyncio
from database import (
    hero_collection, trainings_collection, training_videos_collection,
    about_collection, statistics_collection, social_links_collection
)
from models import Hero, HeroStats, Training, TrainingVideo, About, CareerStep, Quality, MomentMarquant, Statistics, Records, Club, SocialLink

async def seed_data():
    """Seed initial data for Ronaldinho website"""
    
    # Clear existing data
    await hero_collection.delete_many({})
    await trainings_collection.delete_many({})
    await training_videos_collection.delete_many({})
    await about_collection.delete_many({})
    await statistics_collection.delete_many({})
    await social_links_collection.delete_many({})
    
    # Hero data
    hero_data = Hero(
        title="Ronaldinho Gaúcho",
        subtitle="La Magie du Football Brésilien",
        description="Découvrez l'univers de l'une des plus grandes légendes du football mondial",
        image="https://images.unsplash.com/photo-1529629468183-b9cddd7be13b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxCcmF6aWwlMjBmb290YmFsbHxlbnwwfHx8fDE3NTUxMTMwNTJ8MA&ixlib=rb-4.1.0&q=85",
        stats=HeroStats(
            trophees=26,
            matchs=207,
            buts=94,
            ballonOr=1
        )
    )
    await hero_collection.insert_one(hero_data.dict())
    
    # Training data
    trainings = [
        Training(
            nom="Contrôle de Balle Magique",
            duree="45 minutes",
            description="Routine quotidienne pour développer le toucher de balle exceptionnel",
            exercices=[
                "Jonglages avec toutes les parties du corps (20 min)",
                "Contrôles orientés en mouvement (15 min)",
                "Jeux de première touche avec rebonds (10 min)"
            ],
            image="https://images.unsplash.com/photo-1660324833532-cbef6ed4eaa3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxCcmF6aWwlMjBmb290YmFsbHxlbnwwfHx8fDE3NTUxMTMwNTJ8MA&ixlib=rb-4.1.0&q=85",
            ordre=1
        ),
        Training(
            nom="Dribbles & Feintes",
            duree="60 minutes",
            description="Développement des dribbles légendaires et de la créativité",
            exercices=[
                "Élastique (signature move) - 100 répétitions",
                "Roulette marseillaise en slalom (20 min)",
                "Feintes de corps face à des cônes (20 min)",
                "Dribbles en espace réduit (20 min)"
            ],
            image="https://images.unsplash.com/photo-1660324834208-371f2d3b8e2c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwzfHxCcmF6aWwlMjBmb290YmFsbHxlbnwwfHx8fDE3NTUxMTMwNTJ8MA&ixlib=rb-4.1.0&q=85",
            ordre=2
        ),
        Training(
            nom="Passes & Vision de Jeu",
            duree="40 minutes",
            description="Travail de la précision et de la vision périphérique",
            exercices=[
                "Passes courtes rapides en triangle (15 min)",
                "Passes longues de précision (15 min)",
                "Centres millimètrés depuis les ailes (10 min)"
            ],
            image="https://images.unsplash.com/photo-1671037876930-265bbf35e6a9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHw0fHxCcmF6aWwlMjBmb290YmFsbHxlbnwwfHx8fDE3NTUxMTMwNTJ8MA&ixlib=rb-4.1.0&q=85",
            ordre=3
        )
    ]
    
    for training in trainings:
        await trainings_collection.insert_one(training.dict())
    
    # Training videos
    videos = [
        TrainingVideo(
            titre="Élastique de Ronaldinho - Tutorial Complet",
            description="Apprenez la technique signature de Ronaldinho étape par étape",
            url="https://www.youtube.com/embed/ZbR5WcyWl18",
            miniature="https://images.unsplash.com/photo-1614170059029-3b7422659b37?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwzfHxmb290YmFsbCUyMGxlZ2VuZHxlbnwwfHx8fDE3NTUxMTMwNjB8MA&ixlib=rb-4.1.0&q=85",
            duree="8:30",
            category="Technique"
        ),
        TrainingVideo(
            titre="Routine d'Échauffement de Ronaldinho",
            description="L'échauffement complet utilisé par Ronaldinho avant chaque match",
            url="https://www.youtube.com/embed/g3-VxLQO7do",
            miniature="https://images.unsplash.com/photo-1605002713581-123e77bcf83d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHw0fHxmb290YmFsbCUyMGxlZ2VuZHxlbnwwfHx8fDE3NTUxMTMwNTJ8MA&ixlib=rb-4.1.0&q=85",
            duree="12:45",
            category="Échauffement"
        ),
        TrainingVideo(
            titre="Dribbles Magiques - Les Secrets",
            description="Découvrez les secrets des dribbles légendaires de Ronaldinho",
            url="https://www.youtube.com/embed/rIhx2wZ8jnA",
            miniature="https://images.pexels.com/photos/41257/pexels-photo-41257.jpeg",
            duree="15:20",
            category="Dribbles"
        )
    ]
    
    for video in videos:
        await training_videos_collection.insert_one(video.dict())
    
    # About data
    about_data = About(
        quote="Le football est art, et l'art doit apporter de la joie",
        biographie="Ronaldo de Assis Moreira, plus connu sous le nom de Ronaldinho, est né le 21 mars 1980 à Porto Alegre, au Brésil. Considéré comme l'un des plus grands footballeurs de tous les temps, il a révolutionné le jeu par sa créativité, sa technique exceptionnelle et son sourire contagieux. Ses performances spectaculaires ont marqué une génération de fans et inspiré de nombreux jeunes joueurs à travers le monde.",
        carriere=[
            CareerStep(
                periode="1998-2001",
                club="Grêmio",
                description="Débuts professionnels au Brésil, révélation mondiale lors du championnat d'Amérique du Sud U-17"
            ),
            CareerStep(
                periode="2001-2003",
                club="Paris Saint-Germain",
                description="Première expérience européenne, montée en puissance avec des performances éblouissantes"
            ),
            CareerStep(
                periode="2003-2008",
                club="FC Barcelone",
                description="Apogée de sa carrière, Ballon d'Or 2005, période la plus glorieuse"
            ),
            CareerStep(
                periode="2008-2011",
                club="AC Milan",
                description="Maintien au plus haut niveau en Serie A italienne"
            ),
            CareerStep(
                periode="2011-2012",
                club="Flamengo",
                description="Retour triomphal au Brésil avec le club carioca"
            ),
            CareerStep(
                periode="2012-2014",
                club="Atlético Mineiro",
                description="Victoire en Copa Libertadores, dernier grand titre"
            )
        ],
        qualites=[
            Quality(
                nom="Technique Extraordinaire",
                description="Contrôle de balle et dribbles d'une précision exceptionnelle"
            ),
            Quality(
                nom="Créativité Pure",
                description="Invention constante de nouveaux gestes et mouvements"
            ),
            Quality(
                nom="Vision de Jeu",
                description="Passes décisives et intelligence tactique remarquable"
            ),
            Quality(
                nom="Spectacle Permanent",
                description="Capacité unique à enchanter les foules et créer la magie"
            )
        ],
        momentsMarquants=[
            MomentMarquant(
                annee="2002",
                evenement="Champion du Monde",
                description="Victoire en Coupe du Monde avec le Brésil en Corée/Japon, performance mémorable"
            ),
            MomentMarquant(
                annee="2005",
                evenement="Ballon d'Or",
                description="Élu meilleur joueur mondial, consécration de son talent exceptionnel"
            ),
            MomentMarquant(
                annee="2006",
                evenement="Ligue des Champions",
                description="Victoire avec le FC Barcelone face à Arsenal, performance magistrale"
            ),
            MomentMarquant(
                annee="2005",
                evenement="Standing Ovation au Santiago Bernabéu",
                description="Applaudissements des supporters du Real Madrid, reconnaissance ultime"
            )
        ]
    )
    await about_collection.insert_one(about_data.dict())
    
    # Statistics data
    stats_data = Statistics(
        records=Records(
            matchs=468,
            buts=168,
            passes=156,
            trophees=26
        ),
        clubs=[
            Club(
                nom="Grêmio",
                periode="1998-2001",
                matchs=89,
                buts=23
            ),
            Club(
                nom="Paris Saint-Germain",
                periode="2001-2003",
                matchs=77,
                buts=25
            ),
            Club(
                nom="FC Barcelone",
                periode="2003-2008",
                matchs=207,
                buts=94
            ),
            Club(
                nom="AC Milan",
                periode="2008-2011",
                matchs=95,
                buts=26
            )
        ],
        titres=[
            "Coupe du Monde (2002)",
            "Copa América (1999)",
            "Ligue des Champions (2006)",
            "Liga Espagnole (2004-05, 2005-06)",
            "Ballon d'Or (2005)",
            "FIFA World Player (2004, 2005)",
            "Coupe du Monde des Clubs (2006)",
            "Copa Libertadores (2013)",
            "Ligue 1 (2002-03)",
            "Coupe de France (2003, 2004)"
        ]
    )
    await statistics_collection.insert_one(stats_data.dict())
    
    # Social links
    social_links = [
        SocialLink(
            nom="Instagram",
            url="https://instagram.com/ronaldinho",
            icon="instagram",
            ordre=1
        ),
        SocialLink(
            nom="Twitter",
            url="https://twitter.com/ronaldinho",
            icon="twitter",
            ordre=2
        ),
        SocialLink(
            nom="Facebook",
            url="https://facebook.com/ronaldinho",
            icon="facebook",
            ordre=3
        ),
        SocialLink(
            nom="YouTube",
            url="https://youtube.com/ronaldinho",
            icon="youtube",
            ordre=4
        )
    ]
    
    for social in social_links:
        await social_links_collection.insert_one(social.dict())
    
    print("✅ Données seedées avec succès!")

if __name__ == "__main__":
    asyncio.run(seed_data())