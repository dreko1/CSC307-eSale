import pytest
import backend as b

# to run on Windows use command 'py -m pytest test.py'

def test_1():
    assert b.validate_password(b'test') == 0

def test_2():
    assert b.validate_password(b'wrong') == 1