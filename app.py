from typing import Optional
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
# from env import R
from lib import render
from todo import Todo
from open_ai import index, output
from service import create_connection, execute_query
from query import *
from fastapi.middleware.cors import CORSMiddleware

db_url = "./sqlite_db"
connection = create_connection(db_url)
execute_query(connection,str(create_generations_table))

class Item(BaseModel):
    insert: str

app = FastAPI()

origins = [
    "http://0.0.0.0:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.__name__ = 'App'

app.mount("/public", StaticFiles(directory="public"), name="public")

@app.get('/open_ai')
def open_ai():
    dic = {"output":output[0]}
    return dic

@app.post('/open_ai/insert/')
def todo_update(item: Item):
    index(connection, item.insert)
    return RedirectResponse("/open_ai", status_code=303)
