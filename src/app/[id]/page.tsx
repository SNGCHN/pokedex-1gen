import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pokédex - Pokemon Detail",
};

const fetchPokemon = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/pokemons/${id}`);
  if (!res.ok) {
    notFound();
  }
  const pokemon = await res.json();
  console.log("Fetched Pokemon:", pokemon); // 데이터 확인용
  return pokemon;
};

const PokemonDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const pokemon = await fetchPokemon(id);

  if (!pokemon) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        {pokemon.sprites?.front_default && <Image src={pokemon.sprites.front_default} alt={pokemon.korean_name} width={200} height={200} />}
        <h1 className="text-3xl font-bold text-gray-950">
          {pokemon.korean_name} ({pokemon.name})
        </h1>
        <p className="text-gray-950">도감번호: {pokemon.id}</p>
        <p className="text-gray-950">
          키: {pokemon.height} | 몸무게: {pokemon.weight}
        </p>
        <h2 className="text-2xl font-bold text-gray-950 mt-4">타입</h2>
        <ul>
          {pokemon.types?.map((type: any, index: number) => (
            <li key={index} className="text-gray-950">
              {type.type.korean_name} ({type.type.name})
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-bold text-gray-950 mt-4">능력</h2>
        <ul>
          {pokemon.abilities?.map((ability: any, index: number) => (
            <li key={index} className="text-gray-950">
              {ability.ability.korean_name} ({ability.ability.name})
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-bold text-gray-950 mt-4">기술</h2>
        <ul>
          {pokemon.moves?.map((move: any, index: number) => (
            <li key={index} className="text-gray-950">
              {move.move.korean_name}
            </li>
          ))}
        </ul>
        <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          뒤로가기
        </Link>
      </div>
    </div>
  );
};

export default PokemonDetail;
