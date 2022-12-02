from typing import Optional
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from env import R
from lib import render
from todo import Todo
from open_ai import index, output
from service import create_connection, execute_query
from query import *

db_url = "./sqlite_db"
# db_url = "/home/gastone/Desktop/Progetti/ProgettiFrancesco/fastapi-todo-app3/fastapi-todo-app/sqlite_db"
connection = create_connection(db_url)
execute_query(connection,str(create_generations_table))

app = FastAPI()
app.__name__ = 'App'

app.mount("/public", StaticFiles(directory="public"), name="public")

@app.get('/', response_class=HTMLResponse)
def root():
    todos = Todo.all()
    return render("home", todos=todos)

@app.get('/hello', response_class=HTMLResponse)
def hello2():
    return render("page2")

@app.post('/todos')
def todo_create(item: str = Form(...)):
    todo = Todo.create(item)
    print(f'Todo created: {todo.__dict__}')
    return RedirectResponse("/", status_code=303)

@app.post('/todos/{todo_id}')
def todo_update(todo_id: int, item: str = Form(...)):
    todo = Todo.get(todoId)
    todo.update_text(item)
    print(f'Todo created: {todo.__dict__}')
    return RedirectResponse("/", status_code=303)

@app.post('/todos/{todo_id}/check')
def todo_check(todo_id: int):
    todo = Todo.get(todo_id)
    todo.check()
    print(f'Todo {todo.id} checked/unchecked')
    # data = jsonify(todo.__dict__)
    data = todo.__dict__
    return data

@app.get('/open_ai', response_class=HTMLResponse)
def open_ai():
    return render("open_ai",outputt=output)

@app.post('/open_ai/insert')
def todo_update(item: str = Form(...)):
    index(connection, item)
    return RedirectResponse("/open_ai", status_code=303)


















#
