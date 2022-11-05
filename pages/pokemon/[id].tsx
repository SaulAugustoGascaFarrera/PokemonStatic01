import { Button, Card, Container, Grid,Image,Text } from '@nextui-org/react';
import { GetStaticProps,GetStaticPaths, NextPage} from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { Pokemon } from '../../interfaces';
import { localFavorites } from '../../utils';
import confetti from 'canvas-confetti'
import { getPokemonInfo } from '../../utils/getPokemonInfo';


interface Props{
  pokemon: Pokemon;
  
}

const PokemonPage:NextPage<Props> = ({pokemon}) => {

    /*const router = useRouter()

    console.log(router.query)*/

    //console.log(pokemon.species)

    const [isInFavorites,setInFavorites] = useState(localFavorites.existPokemonInFavorites(pokemon.id))


    const onToggleFavorite = () => {
      localFavorites.toggleFavorites(pokemon.id)
      setInFavorites(!isInFavorites)

        if(isInFavorites) return;

        confetti({
          zIndex:999,
          particleCount:100,
          spread: 160,
          angle:160,
         
          origin:{
            x:1,
            y:0
          }
        })
    } 

  return (
   <>
    <Layout title={pokemon.name}>
        <Grid.Container css={{marginTop:'5px'}} gap={2}>

          <Grid xs={12} sm={4}>

            <Card isHoverable css={{padding:'30px'}}>

              <Card.Body>
                <Card.Image 
                  src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                  alt={pokemon.name}
                  width="100%"
                  height={200}
                />
              </Card.Body>

            </Card>

          </Grid>


          <Grid xs={12} sm={8}>

            <Card>
              <Card.Header css={{display:'flex',justifyContent:'space-between'}}>
                <Text h1 transform='capitalize'>{pokemon.name}</Text>

                <Button color='gradient' ghost={!isInFavorites} onPress={onToggleFavorite}>

                    {!isInFavorites ? 'Save as Favorites' : 'In Favorites'}
                </Button>


              </Card.Header>

              <Card.Body>
                  <Text size={30}>Sprites:</Text>

                  <Container direction='row' display='flex' gap={0}>
                    <Image 
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      width={100}
                      height={100}
                    />
                    <Image 
                      src={pokemon.sprites.back_default}
                      alt={pokemon.name}
                      width={100}
                      height={100}
                    />
                    <Image 
                      src={pokemon.sprites.front_shiny}
                      alt={pokemon.name}
                      width={100}
                      height={100}
                    />
                    <Image 
                      src={pokemon.sprites.back_shiny}
                      alt={pokemon.name}
                      width={100}
                      height={100}
                    />
                  </Container>


              </Card.Body>



            </Card>

          </Grid>



        </Grid.Container>
    </Layout>
   </>
  )
}




// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const pokemons151 = [...Array(151)].map((value,index) => `${index + 1}`);

  return {
    paths: pokemons151.map(id =>({
      params:{id: id}
    })),
    fallback: false
  }
}




export const getStaticProps: GetStaticProps = async (ctx) => {
  

 const {id} = ctx.params as {id: string}

 /*const {data} = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

 const pokemon = {
  id: data.id,
  name: data.name,
  sprites: data.sprites
}*/



  return {
    props: {
      //pokemons:response.data.results
      //pokemons: pokemonArray
      /*id:'1',
      name:'bolbasor'*/
      //pokemon: pokemon
      pokemon: await getPokemonInfo(id)
    }
  }
}

export default PokemonPage