from app.models import db, Subbreadit, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_subbreadits():
    focaccia = Subbreadit(
        name='focaccia-fanatics', description='For fans of focaccia who want to share recipes and pictures!', moderator_id=12)
    bake_fails = Subbreadit(
        name='bake-fails', description='Post a clear description of the problem, recipe, and picture if possible to get the best help when troubleshooting.', moderator_id=1)
    low_tech = Subbreadit(
        name='low-tech-baking', description='A sub for discussing alternative baking methods.', moderator_id=3)
    banana_cake = Subbreadit(
        name='is-banana-bread-really-bread', description="We all know the truth, but let's keep it civil-- no flame wars.", moderator_id=11)
    baguette = Subbreadit(
        name='in-the-baguette', description='Toast your best baguette pix and recipes!', moderator_id=5)
    pan = Subbreadit(
        name='pan-tastic', description="Home to every kind of 'pan' there is! From Pan de Bono to Pan Cubano, we want to see your toasts!", moderator_id=10)
    best_loafs = Subbreadit(
        name='bake-hall-of-fame', description='Toast your best bakes and recipes!', moderator_id=6)
    banana_bread = Subbreadit(
        name='real-bread-not-cake', description='Banana, pumpkin, corn, and short bread are all breads and anyone who says otherwise will be banned from this subbreadit. Take all discourse to the anti-banana-bread sub, please.', moderator_id=4)
    technique = Subbreadit(
        name='technique', description='Discuss your favorite methods and techniques with us!', moderator_id=7)
    new_sub10 = Subbreadit(
        name='flat-but-full-on-bread', description='A naan confrontational place to talk bread, even if other people don\'t really think it counts as bread. Tortilla, roti, and pita lovers welcome!', moderator_id=13)
    new_sub11 = Subbreadit(
        name='enriched-breads', description='THE place for all your enriched bread recipes and questions! Toast your bakes to show us what you\'ve got!', moderator_id=7)
    new_sub12 = Subbreadit(
        name='sourdough', description='Your favorite subbreadit for all things sourdough! Feel free to share recipes and/or toast your bakes! Please direct any questions to the troubleshooting subbreadit if seeking help.', moderator_id=11)
    new_sub13 = Subbreadit(
        name='is-a-hot-dog-a-sandwich', description='What makes a sammy a sammy? A sub a sub? What makes a hot dog neither of these? Sub to our Sub to see answers to these insightful questions and more on our subbreadit!1!', moderator_id=12)
    new_sub14 = Subbreadit(
        name='all-bagel-no-lox', description='Open forum to discuss bagels, their history, and the best ways to make and bake them!', moderator_id=9)


    db.session.add(focaccia)
    db.session.add(bake_fails)
    db.session.add(low_tech)
    db.session.add(banana_cake)
    db.session.add(baguette)
    db.session.add(pan)
    db.session.add(best_loafs)
    db.session.add(banana_bread)
    db.session.add(technique)
    db.session.add(new_sub10)
    db.session.add(new_sub11)
    db.session.add(new_sub12)
    db.session.add(new_sub13)
    db.session.add(new_sub14)
    db.session.commit()


def undo_subbreadits():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.subbreadits RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM subbreadits"))

    db.session.commit()
