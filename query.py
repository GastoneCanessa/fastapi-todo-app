from pypika import Query, Table, Field, Column

create_generations_table = """
CREATE TABLE IF NOT EXISTS generations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  prompt TEXT,
  output TEXT
);
"""

#-----------------creazione tabella con pypika --> problemi con autoincrement

# create_generations_table = Query \
#     .create_table("generations") \
#     .columns(
#         Column("id","INT ", nullable=False),
#         Column("prompt", "TEXT", nullable=False),
#         Column("output", "TEXT", nullable=False),
#         ).primary_key("id")

#--------------------insert---------------

def mquery(data):
    generations = Table('generations')
    create_generations = Query.into(generations).columns('prompt', 'output')\
    .insert(data['prompt'],data['output'])
    return create_generations



#-----------------------sintassi insert alternativa

# @classmethod
# def insert_dict(self, table, d): return (
#     self
#     .into(table)
#     .columns(*d.keys())
#     .insert(*d.values())
# )
#
# Query.insert_dict = insert_dict

#                               example
# create_generations = Query.insert_dict(generations, {'prompt': 'John', 'output': 'Doe',})
