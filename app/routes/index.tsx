import { json, LoaderArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

export interface Flags {
  svg: string;
  png: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Language {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

export interface Translations {
  br: string;
  pt: string;
  nl: string;
  hr: string;
  fa: string;
  de: string;
  es: string;
  fr: string;
  ja: string;
  it: string;
  hu: string;
}

export interface RegionalBloc {
  acronym: string;
  name: string;
  otherNames: string[];
  otherAcronyms: string[];
}

export interface AllCountries {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  flags: Flags;
  currencies: Currency[];
  languages: Language[];
  translations: Translations;
  flag: string;
  regionalBlocs: RegionalBloc[];
  cioc: string;
  independent: boolean;
  gini?: number;
}

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  //   const limit = url.searchParams.get("limit");
  let offset = Number(url.searchParams.get("offset")) || 0;

  const countries = await fetch("https://restcountries.com/v2/all").then(
    (response) => response.json().then((data) => data.slice(offset, 8 + offset))
  );

  return json(
    { countries, offset },
    {
      headers: {
        "Cache-Control": `public, max-age=${1000}, s-maxage=${1000 * 10}`,
      },
    }
  );
}

import type { ActionArgs } from "@remix-run/node";
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const countries = await fetch(" https://restcountries.com/v3.1/name/ar").then(
    (response) => response.json()
  );

  return countries;
}

const Index = () => {
  const { countries, offset } = useLoaderData<{
    countries: AllCountries[];
    offset: any;
  }>();

  return (
    <div className="container px-6 pt-20 mx-auto">
      <h1 className="py-10 text-3xl font-bold tracking-widest text-center text-white">
        CWS
      </h1>
      <div className="grid grid-cols-4 gap-10">
        {countries.map((i) => (
          <div className="text-white duration-200 shadow-xl bg-white/5 max-w-smoverflow-hidden rounded-3xl hover:scale-105 hover:shadow-xl">
            <Link to={`/${i.name}`}>
              <img
                src={
                  i.name.toLowerCase() === "afghanistan"
                    ? "https://cdn.britannica.com/40/5340-004-B25ED5CF/Flag-Afghanistan.jpg"
                    : i.flag
                }
                alt="Flag not Found"
                className="flex items-center justify-center object-cover w-full h-44 rounded-t-3xl"
              />
              <div className="p-8 pt-6 ">
                <h1 className="text-lg font-semibold tracking-wider">
                  {i.name}
                </h1>
                <p className="mb-5 text-medium">
                  Well, aren't you going up to the lake tonight, you've been
                  planning it for two weeks.
                </p>
                <button className="w-full py-2 duration-75 bg-brand-green hover:bg-brand-green/80 hover:shadow-xl rounded-3xl">
                  See More
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-10">
        <Link
          to={`?offset=${offset <= 0 ? offset : offset - 5}`}
          className="inline-flex items-center px-5 py-2 text-base font-medium text-white transition-all duration-200 border border-transparent rounded-full shadow-sm bg-brand-green hover:bg-brand-green/80 focus:outline-none"
        >
          Prev
        </Link>

        <Link
          to={`?offset=${offset + 5}`}
          className="inline-flex items-center px-5 py-2 text-base font-medium text-white transition-all duration-200 border border-transparent rounded-full shadow-sm bg-brand-green hover:bg-brand-green/80 focus:outline-none"
        >
          Next
        </Link>
      </div>
      <Form action="/manomenulis" className="container mx-auto my-auto ">
        <div>
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700"
            >
              Quick search
            </label>
            <div className="relative flex items-center mt-1">
              <input
                type="text"
                name="search"
                id="search"
                placeholder=""
                className="block w-full pr-12 text-white rounded-md shadow-sm bg-brand-dark-600 sm:text-sm placeholder:text-gray-400"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <button className="inline-flex items-center px-2 font-sans text-sm font-medium text-gray-400 border border-gray-200 rounded">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            className="w-full p-2 mt-5 text-center bg-brand-main"
            type="submit"
          >
            Pasirinkteti
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Index;
