import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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
}

export interface Country {
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
  gini: number;
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
}

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  const country = await fetch(
    `https://restcountries.com/v2/name/${url.pathname.split("/")[1]}`
  ).then((response) => response.json());

  return json({ country: country[0] });
}

const Country = () => {
  const { country } = useLoaderData<{ country: Country }>();
  return (
    <div className="container px-3 py-10 mx-auto md:px-5">
      <h1 className="mb-10 text-3xl font-semibold tracking-wider text-white">
        {country.name}
      </h1>

      <div className="mx-auto lg:grid md:grid-cols-3 xl:grid-cols-3 lg:gap-x-16">
        <div className="text-sm leading-6 md:col-span-2 xl:col-span-2">
          <img
            src={country.flag}
            alt="Country Flag"
            className="shadow-xl rounded-3xl h-[600px] w-full"
          />
        </div>
        <div className="flex flex-col justify-between ">
          <div className="my-auto text-sm font-semibold text-white uppercase ">
            <h2 className="text-3xl font-bold tracking-widest">
              {country.name} / {country.region}
            </h2>

            <p className="mt-4 font-normal normal-case">
              <strong className="mr-2">Capital:</strong>
              {country.capital}
            </p>
            <p className="mt-4 font-normal normal-case">
              <strong className="mr-2">Borders:</strong>
              {country.borders
                ? country.borders.map((i) => <span className="pr-2">{i}</span>)
                : "No borders"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
