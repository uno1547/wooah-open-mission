const OpenAI = require('openai');
// const zodTextFormat = require('openai/helpers/zod')
// const z = require('zod');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})


// exports.recommendPlaylists = async ({query}) => {
//   const response = await openai.chat.completions.create({
//     model: "gpt-4.1",
//     response_format: {type: "json_object"},
//     messages : [
//       { role: "system", content: "유효한 JSON배열 형태로만 반환, 각 객체는 name(string), singer(string), genre(string), youtubeTumbnail(string) 4개 필드를 포함해야 합니다." },
//       { role: "user", content: `아이유 노래 3개 추천해줘, 응답은 무조건 json 배열 형태로 해줘` }
//       // { role: "user", content: `아이유 노래 3곡 추천해줘, 응답은 무조건 json 배열 형태로 해줘 name, singer, genre, youtubeTumbnail 4개 필드반환되게` }
//     ]
//   })
//   console.log(response.choices[0].message);
//   return response;
// }

// exports.recommendPlaylists = async ({query}) => {
//   const response = await openai.responses.parse({
//     model: "gpt-4.1",
//     input: `아이유 노래 3곡 추천해줘, 응답은 무조건 json 배열 형태로 해줘 name, singer, genre, youtubeTumbnail 4개 필드반환되게 ${query}`
//   })
//   console.log(response);
//   return response;
// }


exports.recommendPlaylists = async ({query}) => {
  const response = await openai.responses.create({
    model: "gpt-4.1",
    // input: `아이유 노래 3곡 추천해줘, 응답은 무조건 json 배열 형태로 해줘 name, singer, genre, youtubeTumbnail 4개 필드반환되게 ${query}`,
    input: `${query}, 응답은 무조건 json 배열 형태로 해줘 name, singer, genre, youtubeTumbnail 4개 필드반환되게`,
    text: {
        format: {
            type: "json_schema",
            name: "playlist_recommendation",
            schema: {
                type: "object",
                properties: {
                    playlists: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                name: { type: "string", description: "노래 제목" },
                                singer: { type: "string", description: "가수 이름" },
                                genre: { type: "string", description: "장르" },
                                youtubeLink: { type: "string", description: "유튜브 링크 URL" },
                                youtubeTumbnail: { type: "string", description: "유튜브 썸네일 URL" },
                            },
                            required: ["name", "singer", "genre", "youtubeLink", "youtubeTumbnail"],
                            additionalProperties: false
                        }
                    },
                },
                required: ["playlists"],
                additionalProperties: false
            },
            strict: true
        }
    }
  })

  // console.log(response.output_text);
  const raw = response.output_text;
  // console.log(JSON.parse(response.output_text));
  const parsed = JSON.parse(raw);
  return parsed.playlists;
}