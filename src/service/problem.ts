export default class ProblemService {
  findRecommendation = async (size: number) => {
    if (isNaN(size)) return undefined;
    try {
      const result = await fetch(`https://solved.ac/api/v3/search/problem?query=*0&sort=random`);
      if (result.status !== 200) return undefined;
      const resultJson = (await result.json()).items;
      if (size > resultJson.length) return undefined;
      return resultJson.slice(0, size);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };
}
