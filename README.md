# Geocoder CLI

A CLI program that takes a data file containing addresses (CSV) and prints the results to the console (for now).


## Environment / Installation

This is targeting `node v8.1.3`.

- Download project (clone or otherwise)
- `npm install`
- Copy the `.env.example` to `.env` and add your Google Maps API key
- There are data files committed to `data/*` that can be used for testing, simply modify your `.env`.


## Usage

This is a CLI application but expects data to be placed in the data directory with the name `all.csv` (for now).

```shell
./app
# or
node app
```

## Notes

- NOTE: I did end up using one dependency, `dotenv`, to make environment variables easier to deal with.
- TODO: Need a lot more tests- ran out of time and had to abandon TDD.

## Roadmap / TODO
- Write tests.
- Handle `TODO:`s that exist in the code base.
- Bring in common userland modules to replace some of the handrolled implementations (like request, ramda, etc).
- Allow for the file to be passed in via cli.
- Pass roottop results all the way back up to `geocodeFile`.
- Break out the rate limiting logic from `line-stream` to it's own that acts on entire lines for finer control.
