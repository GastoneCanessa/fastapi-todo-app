from flask import Flask, request
import redis
from waitress import serve
from lib import render

app = Flask(__name__)
r = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)


@app.route('/')
def hello():
    r.set('foo', 'bar')
    # foo = request.args.get('foo')
    test = "1234"
    foo = r.get('foo')
    # template = lookup.get_template('home.haml')
    # return template.render(test=test, foo=foo)
    return render("home", test=test, foo=foo)

# @app.route('/foo', methods=["POST"])
# def foo():

if __name__ == '__main__':
    app.run()
    # serve(app, host='0.0.0.0', port=3000)
