from app.models import db, Toast, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_toasts():
    focaccia = Toast(
        title='Sourdough Focaccia!', body='Has anyone tried using sourdough discard to make focaccia? It\'s a great way to use up discard!', user_id=12, image_url="", subbreadit_id=1)
    bake_fails = Toast(
        title='Loaf Didn\'t Rise, Help!', body='Tried to make a loaf of sourdough and it didn\'t rise properly! I passed the float test, I don\'t know whats wrong!', user_id=1, image_url="", subbreadit_id=2)
    low_tech = Toast(
        title='Glass Oven', body='Has anyone seen that metal oven with a glass top that can bake a loaf in three hours? Talk about apocalypse ready.', user_id=3, image_url="", subbreadit_id=3)
    banana_cake = Toast(
        title='Banana Bread is not Bread', body="It doesn't even take any leavening! It's a cake, not a bread. Get real, folks!", user_id=11, image_url="", subbreadit_id=4)
    baguette = Toast(
        title='French Baguette Recipe', body="for the poolish: 1 cup of flour, 1/2 cup of water, pinch of dry yeast, rest overnight. for the dough: 3 1/2 cups flour, 1 cup water, poolish, 2 tsp salt, 1 1/2 dry yeast.", user_id=6, image_url="", subbreadit_id=5)
    pan = Toast(
        title='Pan de Bono', body="Has anyone ever tried putting guava in their pan de bono? Like a guava and cheese tequeño? Let me know in the comments!", user_id=10, image_url="", subbreadit_id=6)
    best_loafs = Toast(
        title='Challah-luyah!', body='Made an awesome loaf of challah today! Check out that ovenspring!', user_id=4, image_url="", subbreadit_id=7)
    banana_bread = Toast(
        title='Banana Bread IS Bread!', body='All the naysayers have to admit banana bread is the best kind of bread-- it\'s hearty, you can have it for breakfast or dessert, and it\'s perfect for french toast. Who could deny the deliciousness of banana bread?', user_id=4, image_url="", subbreadit_id=8)
    technique = Toast(
        title='To Autolyse or not to Autolyse', body='Get a quick, easy, gorgeous window-pane by autolysing your dough! Just mix flour and water before adding in your starter or salt and let it sit at room temp for four ~ eight hours and watch the texture change!', user_id=10, image_url="", subbreadit_id=9)
    technique2 = Toast(
        title='Mixing Methods', body='Been trying the Rubaud method while kneading my dough and my hand keeps knocking against the inside of the bowl. Does anyone have any other techniques for kneading that aren\'t the slap and fold method? P.S. I have a small counter space.', user_id=10, image_url="", subbreadit_id=9)


    db.session.add(focaccia)
    db.session.add(bake_fails)
    db.session.add(low_tech)
    db.session.add(banana_cake)
    db.session.add(baguette)
    db.session.add(pan)
    db.session.add(best_loafs)
    db.session.add(banana_bread)
    db.session.add(technique)
    db.session.add(technique2)
    db.session.commit()


def undo_toasts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.toasts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM toasts"))

    db.session.commit()
