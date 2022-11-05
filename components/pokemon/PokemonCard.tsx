import { Card, Grid, Row,Text } from "@nextui-org/react"
import { FC } from "react"
import { SmallPokemons } from "../../interfaces"
import { useRouter } from 'next/router';


interface Props{
    poke: SmallPokemons
}

export const PokemonCard : FC<Props> = ({poke}) => {

    const router = useRouter()

    const onClick = () => {
        //router.push(`/pokemon/${poke.id}`)
        router.push(`/name/${poke.name}`)
    }

  return (
    <>
    <Grid xs={6} sm={3} md={2} xl={1} key={poke.id}>
                <Card isHoverable isPressable onClick={onClick} >
                  <Card.Body css={{p:1}}>
                    <Card.Image 

                      src={poke.img}
                      width="100%"
                      height="140px"
                    
                    />
                  </Card.Body>
                  <Card.Footer>
                    <Row justify='space-between'>

                        <Text transform='capitalize' >{poke.name}</Text>
                        <Text># {poke.id}</Text>
                        
                    </Row>
                  </Card.Footer>
                </Card>
              </Grid>
    </>
  )
}
