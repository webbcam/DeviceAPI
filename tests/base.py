import requests
import argparse

from helpers import config

headers = config.headers
url = config.url

#headers = {'content-type':'application/json'}
#url = 'https://cjwebb.io'

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('--url', nargs='?', default=url)
  parser.add_argument('--headers', nargs='?', default=headers)

  parser.add_argument('--get', nargs='?', default=None)
  parser.add_argument('--post', nargs='?', default=None)
  parser.add_argument('--put', nargs='?', default=None)
  parser.add_argument('--delete', nargs='?', default=None)

  parser.add_argument('-u', '--username', nargs='?', default=None)
  parser.add_argument('-p', '--password', nargs='?', default=None)
  parser.add_argument('-t', '--token', nargs='?', default=None)
  parser.add_argument('-c', '--code', nargs='?', default=None)

  args = parser.parse_args()

  payload = build_payload(username=args.username, password=args.password,
     code=args.code, token=args.token)

  if args.get:
    result = get(args.url + args.get, args.headers, payload)
    print result
  elif args.post:
    result = post(args.url + args.post, args.headers, payload)
    print result
  elif args.put:
    result = put(args.url + args.put, args.headers, payload)
    print result
  elif args.delete:
    result = delete(args.url + args.delete, args.headers, payload)
    print result

def build_device_payload(devID=None, devName=None, newDevName=None, devDesc=None, devType=None, token=None):
  payload = {}
  if devID:
    payload['devID'] = devID
  if devName:
    payload['devname'] = devName 
  if newDevName:
    payload['new_devname'] = newDevName 
  if devDesc:
    payload['devdesc'] = devDesc
  if devType:
    payload['devtype'] = devType
  if token:
    payload['token'] = token

  return payload

def build_payload(username=None, newUsername = None, password=None, newPassword=None, code=None, token=None):
  payload = {}
  if username:
    payload['username'] = username
  if newUsername:
    payload['new_username'] = newUsername
  if password:
    payload['password'] = password
  if newPassword:
    payload['new_password'] = newPassword
  if code:
    payload['code'] = code
  if token:
    payload['token'] = token

  return payload

def get(url, headers, payload):
  try:
    return requests.get(url, headers=headers, json=payload).json()
  except:
    return None

def post(url, headers, payload):
  try:
    return requests.post(url, headers=headers, json=payload).json()
  except:
   return None

def put(url, headers, payload):
  try:
    return requests.put(url, headers=headers, json=payload).json()
  except:
    return None

def delete(url, headers, payload):
  try:
    return requests.delete(url, headers=headers, json=payload).json()
  except:
    return None

# Possible Parameters
#   username
#   password
#   token
#   code
# ###################
if __name__ == "__main__":
  main()
