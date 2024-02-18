import React, { FC, ReactElement } from "react"
import styled from "styled-components"
import { stopEventPropagation } from "../elements/EventListeners"

type Props = {
  country: string
  setCountry: (country: string) => void
  language: string
  setLanguage: (language: string) => void
}

type LangWithCode = {
  name: string
  code: string
}

type LangByCountry = {
  name: string
  countryCode: string
  languages: LangWithCode[]
}

type LangByContinent = {
  title: string
  countries: LangByCountry[]
}

export const LANG_ENGLISH = "en"
export const COUNTRY_US = "us"

export const LanguagesDrawer: FC<Props> = ({ country, setCountry, language, setLanguage }): ReactElement => {
  const SINGLE_LANG = 1

  const selectNextLanguageForCountry = (countryCode: string, languages: LangWithCode[]) => {
    if (country !== countryCode) {
      // Select a first language from a list
      const [firstLang] = languages
      setCountry(countryCode)
      setLanguage(firstLang?.code ?? LANG_ENGLISH)
    } else {
      // Select a next language from a list
      const currentLangIndex = languages.findIndex((lang) => lang.code === language)
      let nextIndex = currentLangIndex < 0 ? 0 : currentLangIndex + 1
      if (nextIndex >= languages.length) nextIndex = 0
      const selectedLang = languages[nextIndex]
      setLanguage(selectedLang?.code ?? LANG_ENGLISH)
    }
  }

  const setLanguageAndCountry = (event: any, countryCode: string, languageCode: string) => {
    setCountry(countryCode)
    setLanguage(languageCode)
    stopEventPropagation(event)
  }

  return (
    <Container>
      {languages.map((continent, indexContinent) => (
        <div key={continent.title}>
          <SectionTitle isFirst={indexContinent === 0}>{continent.title}</SectionTitle>
          <List>
            {continent.countries.map((countryEntry) => (
              <Country key={countryEntry.countryCode} selected={countryEntry.countryCode === country} onClick={() => selectNextLanguageForCountry(countryEntry.countryCode, countryEntry.languages)}>
                <CountryName>{countryEntry.name}</CountryName>
                <Languages>
                  {countryEntry.languages.map((languageEntry, indexLang) => (
                    <BtnLang
                      key={indexLang + languageEntry.code}
                      selected={countryEntry.countryCode === country && languageEntry.code === language && countryEntry.languages.length > SINGLE_LANG}
                      onClick={(event) => setLanguageAndCountry(event, countryEntry.countryCode, languageEntry.code)}
                    >
                      {languageEntry.name}
                    </BtnLang>
                  ))}
                </Languages>
              </Country>
            ))}
          </List>
        </div>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Alliance-PlattSemiBold, Alliance-No2-Regular, Helvetica, sans-serif;
  overflow: auto;
`

const SectionTitle = styled.div<{ isFirst: boolean }>`
  font-size: 30px;
  padding-left: 18px;
  ${({ isFirst }) => !isFirst && "margin-top: 80px;"}
  margin-bottom: 24px;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const Country = styled.div<{ selected?: boolean }>`
  border-radius: 15px;
  background: ${({ selected }) => (selected ? "rgb(255 255 255 / 7%)" : "transparent")};
  padding: 16px 17px 14px 17px;
  color: white;
  border: none;
  margin-right: 30px;
  cursor: pointer;
  transition: background 100ms ease-in;

  &:hover {
    ${({ selected }) => !selected && "background: rgb(255 255 255 / 4%);"}
  }
`

const CountryName = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 20px;
  margin-bottom: 14px;
`

const Languages = styled.div`
  display: flex;
  flex-direction: row;
`

const BtnLang = styled.div<{ selected?: boolean }>`
  background: transparent;
  font-size: 15px;
  color: ${({ selected }) => (selected ? "rgb(255 255 255 / 100%)" : "rgb(255 255 255 / 80%)")};
  ${({ selected }) => selected && "text-shadow: 0 0 20px #ffffff78;"}
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: color 100ms ease-in;
  margin-right: 25px;

  &:hover {
    ${({ selected }) => !selected && "color: rgb(255 255 255 / 90%);"}
  }
`

const languages: LangByContinent[] = [
  {
    title: "North America",
    countries: [
      {
        name: "United States",
        countryCode: "us",
        languages: [{ name: "English", code: "en" }]
      },
      {
        name: "Canada",
        countryCode: "ca",
        languages: [
          { name: "English", code: "en" },
          { name: "Français", code: "fr" }
        ]
      },
      {
        name: "México",
        countryCode: "mx",
        languages: [
          { name: "English", code: "en" },
          { name: "Español", code: "es" }
        ]
      },
      {
        name: "Puerto Rico",
        countryCode: "pr",
        languages: [
          { name: "English", code: "en" },
          { name: "Español", code: "es" }
        ]
      }
    ]
  },
  {
    title: "Europe",
    countries: [
      {
        name: "Belgium",
        countryCode: "be",
        languages: [
          { name: "Nederlands", code: "nl" },
          { name: "Français", code: "fr" }
        ]
      },
      {
        name: "Česko",
        countryCode: "cz",
        languages: [{ name: "Čeština", code: "cs" }]
      },
      {
        name: "Danmark",
        countryCode: "dk",
        languages: [{ name: "Dansk", code: "da" }]
      },
      {
        name: "Deutschland",
        countryCode: "de",
        languages: [{ name: "Deutsch", code: "de" }]
      },
      {
        name: "Ελλάδα",
        countryCode: "gr",
        languages: [{ name: "Ελληνικά", code: "el" }]
      },
      {
        name: "España",
        countryCode: "es",
        languages: [{ name: "Español", code: "es" }]
      },
      {
        name: "France",
        countryCode: "fr",
        languages: [{ name: "Français", code: "fr" }]
      }
    ]
  },
  {
    title: "Asia",
    countries: [
      {
        name: "中国",
        countryCode: "cn",
        languages: [{ name: "中国人", code: "zh" }]
      },
      {
        name: "日本",
        countryCode: "jp",
        languages: [{ name: "日本", code: "ja" }]
      },
      {
        name: "대한민국",
        countryCode: "kr",
        languages: [{ name: "한국어", code: "ko" }]
      }
    ]
  }
]
