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


    db.session.add(focaccia)
    db.session.add(bake_fails)
    db.session.add(low_tech)
    db.session.add(banana_cake)
    db.session.add(baguette)
    db.session.add(pan)
    db.session.add(best_loafs)
    db.session.add(banana_bread)
    db.session.add(technique)
    db.session.commit()


def undo_subbreadits():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.subbreadits RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM subbreadits"))

    db.session.commit()
