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
  const search = url.searchParams.get("search");
  let offset = Number(url.searchParams.get("offset")) || 0;
  const apiUrl = "https://restcountries.com/v2/";

  let fetchURL = search
    ? `${apiUrl}name/${search}?fields=name,flag`
    : `${apiUrl}all?fields=name,flag`;

  let countries = await fetch(fetchURL).then((response) =>
    response.json().then((data) => {
      if (data.status == "404") {
        return;
      } else {
        return data.slice(offset, 8 + offset);
      }
    })
  );

  return json(
    { countries, offset },
    {
      headers: {
        "Cache-Control": `public, max-age=${10}, s-maxage=${10 * 10}`,
      },
    }
  );
}

const Index = () => {
  const { countries, offset } = useLoaderData<{
    countries: AllCountries[];
    offset: any;
  }>();

  console.log(countries);

  return (
    <div className="container px-6 pt-20 mx-auto">
      <div className="flex justify-between w-full mb-10">
        <h1 className="text-3xl font-bold tracking-widest text-white ">CWS</h1>
        <Form action="">
          <div className="relative ">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Find A Country"
              className="block w-full pl-0 pr-10 text-white bg-transparent border-0 border-b-2 border-brand-green focus:border-b-2 focus:border-brand-green ring-0 sm:text-sm focus:border-0 focus:ring-0"
            />
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <button
                type="submit"
                className="inline-flex items-center px-2 text-sm text-white "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Form>
      </div>
      <div className="grid grid-cols-4 gap-10">
        {countries
          ? countries.map((i) => (
              <div
                className="text-white duration-200 shadow-xl bg-white/5 max-w-smoverflow-hidden rounded-3xl hover:scale-105 hover:shadow-xl"
                key={i.name}
              >
                <Link to={`/${i.name}`}>
                  <img
                    src={i.flag}
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
            ))
          : "Country not found"}
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
    </div>
  );
};

export default Index;
