import os
import openai

from query import Query, mquery
from service import insert_generation, get_generations, create_connection
from pypika import Table, Field, Column

data = {}
output = ['...']

def index(connection, input):
    api_key = os.getenv("OPENAI_API_KEY")
    if api_key is '':
        raise ValueError("Please set OPENAI_API_KEY environment variable")
    openai.api_key = os.getenv("OPENAI_API_KEY")
    prompt = generate_prompt(input)
    response = openai.Completion.create(
        model="text-davinci-002",
        prompt=prompt,
        temperature=0.6,
    )
    data['prompt'] = prompt
    data['output'] = response.choices[0].text
    output[0] = response.choices[0].text
    generations = Table('generations')

    # create_generations = Query.insert_dict(generations, data)
    create_generations = mquery(data)
    insert_generation(connection, create_generations)
    get_generations(connection)


def generate_prompt(input):
    """ teach your ai """
    return format(input.capitalize())
