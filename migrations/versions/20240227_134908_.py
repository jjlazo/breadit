"""empty message

Revision ID: 178e41a1c425
Revises: 8723a872e5c2
Create Date: 2024-02-27 13:49:08.874085

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '178e41a1c425'
down_revision = '8723a872e5c2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('downvotes',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('toast_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['toast_id'], ['toasts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'toast_id')
    )
    op.create_table('upvotes',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('toast_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['toast_id'], ['toasts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'toast_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('upvotes')
    op.drop_table('downvotes')
    # ### end Alembic commands ###