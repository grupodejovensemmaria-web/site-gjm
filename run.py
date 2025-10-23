from app import app
from datetime import datetime

def datetimeformat(value, format="%d/%m/%Y"):
    if isinstance(value, str):
        try:
            value = datetime.fromisoformat(value)
        except ValueError:
            return value
    return value.strftime(format)



if __name__ == '__main__':

    app.jinja_env.filters['datetimeformat'] = datetimeformat
    app.run(host='0.0.0.0', port=5005, debug=True)
