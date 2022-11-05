import type { NextPage,GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Layout } from '../components/layouts'
import pokeApi from '../api/pokeApi';
import { SmallPokemons,PokemonListResponse } from '../interfaces'
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { PokemonCard } from '../components/pokemon';


interface Props{
  pokemons: SmallPokemons[]
}

const Home: NextPage<Props> = ({pokemons}) => {

  //console.log(pokemons)

  return (
    <>
      <Layout>

      <Grid.Container gap={2} justify={'flex-start'}>

          {
            pokemons.map((poke,i) => (
              <PokemonCard key={poke.id} poke={poke} />
            ))
          }

      </Grid.Container >

      </Layout>
    </>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  

  //console.log("Hello From server")

  const response = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  //console.log(response.data)

  const pokemonArray: SmallPokemons[] = response.data.results.map((poke,i) => ({
    ...poke,
    id: i+1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`
  }))

  return {
    props: {
      //pokemons:response.data.results
      pokemons: pokemonArray
    }
  }
}

export default Home
