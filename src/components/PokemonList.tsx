"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pokemon } from "@/types/pokemon";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch("/api/pokemons");
        const data = await response.json();
        setPokemonList(data);
      } catch (error) {
        console.log("오류가 발생했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) {
    return <p>로딩 중입니다.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {pokemonList.map((pokemon) => (
        <Link href={`/${pokemon.id}`} key={pokemon.id}>
          <div className="border p-4 rounded-lg bg-white shadow-md flex flex-col items-center relative">
            <p className="text-gray-950 absolute top-0 left-0 p-2">No.{pokemon.id}</p>
            <Image src={pokemon.sprites.front_default} alt={pokemon.korean_name} width={96} height={96} />
            <h2 className="text-lg font-bold text-gray-950 text-center">
              {pokemon.korean_name} ({pokemon.name})
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PokemonList;
