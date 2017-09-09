import base
import argparse

from helpers import config

headers = config.headers
url = config.device_url

def main():
  parser = argparse.ArgumentParser()
  subparsers = parser.add_subparsers()

  add_parser = subparsers.add_parser('add', help='add a device')
  add_parser.add_argument(dest='cmd', action='store_const', const='add')
  add_parser.add_argument('--name', required=True)
  add_parser.add_argument('--description', required=True)
  add_parser.add_argument('--type', required=True)
  add_parser.add_argument('-t', '--token', required=True)

  delete_parser = subparsers.add_parser('delete', help='delete a device')
  delete_parser.add_argument(dest='cmd', action='store_const', const='delete')
  delete_parser.add_argument('-id', '--id', required=True)
  delete_parser.add_argument('-t', '--token', required=True)

  get_parser = subparsers.add_parser('get', help='get a device(s)')
  get_parser.add_argument(dest='cmd', action='store_const', const='get')
  get_parser.add_argument('-id', '--id', nargs='?', default=None)
  get_parser.add_argument('--name', nargs='?', default=None)
  get_parser.add_argument('-t', '--token', required=True)

  args = parser.parse_args()
  ret = None
  if args.cmd == 'add':
    print add(args.name, args.description, args.type, args.token)
  elif args.cmd == 'delete':
    print delete(args.id, args.token)
  elif args.cmd == 'get':
    print get(args.id, args.name, args.token)

def add(newDevName, devDesc, devType, token):
  payload = base.build_device_payload(newDevName=newDevName, devDesc=devDesc, devType=devType, token=token)
  ret = base.post(url, headers, payload) 

  return ret

def get(devID, devName, token):
  payload = base.build_device_payload(devID=devID, devName=devName, token=token)
  ret = base.get(url, headers, payload) 

  return ret

def delete(devID, token):
  payload = base.build_device_payload(devID=devID, token=token)
  ret = base.delete(url, headers, payload) 

  return ret

if __name__ == "__main__":
  main()
