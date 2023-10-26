// RUN IT WITH "npm run example / dev"

import { ArtistTracksResponse } from "ym-api/dist/types";
import LASTFM from "../priv/LAST_FM_TOKEN.json";
import CREDS from "../priv/YA_CREDS.json";
import axios from "axios";
import { YMApi } from "ym-api";

type LastFMResponse = {
  count: number;
  name: string;
  url: string;
};

const endArrCheck = (arr: string[], endStr: string): boolean => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].endsWith(endStr)) {
      return true;
    }
  }

  return false;
};

const lastFmCheckForTags = async (artistName: string): Promise<boolean> => {
  const token: string = LASTFM.api_token;
  const API_URL = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${artistName}&api_key=${token}&format=json`;
  let response: LastFMResponse[] = [];
  const check = /ukrain(e|ian)/i;

  await axios.get(API_URL).then((res) => {
    response = res.data.toptags.tag;
  });

  for (let i = 0; i < response.length; i++) {
    if (check.test(response[i].name)) {
      console.log(`[${artistName}] Last FM: Found`);
      return true;
    }
  }

  return false;
};

export const checkByNick = async (artistName: string): Promise<boolean> => {
  if (await lastFmCheckForTags(artistName)) return true;
  return false;
};

export const getArtistIsUkr = async (artistId: number): Promise<boolean> => {
  const client = new YMApi();
  await client.init({
    access_token: CREDS.TOKEN,
    uid: CREDS.UID,
  });
  const result: ArtistTracksResponse = await client.getArtistTracks(artistId);
  console.log(result.tracks);
  return false;
};

export async function isUkr(artistName: string): Promise<boolean> {
  const nameCheck = /[ïґi]/i;
  const words: string[] | null = artistName.includes(" ")
    ? artistName.split(" ")
    : null;

  if (words !== null) {
    if (endArrCheck(words, "ний") || endArrCheck(words, "ный")) return true;

    if (nameCheck.test(artistName)) {
      if (!/[a-hj-z]/i.test(artistName)) {
        return true;
      }
    }
  }

  return false;
}
