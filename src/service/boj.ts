import axios from 'axios';
import * as cheerio from 'cheerio';
import { val } from 'cheerio/lib/api/attributes';

export interface BojProblemInfo {
  problemTitle: string;
  problemDescription: string[];
  problemInput: string[];
  problemOutput: string[];
  sampleInput: string[];
  sampleOutput: string[];
}

export default class BojService {
  findUserByUserid = async (userId: string | undefined) => {
    if (typeof userId !== 'string') return undefined;
    try {
      const result = await fetch(`https://solved.ac/api/v3/user/show?handle=${userId}`);
      if (result.status !== 200) return undefined;
      const resultJson = await result.json();
      return resultJson;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  findRecommendedProblem = async (size: number) => {
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

  getProblemInfo = async (problemId: number) => {
    if (isNaN(problemId)) return undefined;
    const baseURL = 'https://www.acmicpc.net/';
    const url = `https://www.acmicpc.net/problem/${problemId}`;
    try {
      const problemPage = await axios.get(url, {
        headers: {
          // 일반적인 웹 브라우저의 User-Agent 예시
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          // 필요에 따라 더 많은 헤더를 추가할 수 있습니다.
        },
      });
      const problemPageHtml = await problemPage.data;
      const $ = cheerio.load(problemPageHtml);
      // 문제 제목 추출
      const problemTitle = $('#problem_title').text().trim();
      // 문제 설명 추출
      const problemDescriptions: String[] = [];
      $('#problem_description p').each(function (this: any) {
        let content: string = '';
        if ($(this).find('img').length > 0) {
          content = $(this).find('img').attr('src') as string;
          content = content.startsWith('http') ? content : new URL(content, baseURL).href;
        } else {
          content = $(this).text();
        }
        if (content !== '') problemDescriptions.push(content);
      });
      // 문제 입력 설명 추출
      const problemInput: String[] = [];
      $('#problem_input p').each(function (this: any) {
        const text = $(this).text();
        problemInput.push(text);
      });
      // 문제 출력 설명 추출
      const problemOutput: String[] = [];
      $('#problem_output p').each(function (this: any) {
        const text = $(this).text();
        problemOutput.push(text);
      });
      // 입력 예제 데이터 추출
      const sampleInput: String[] = [];
      $('pre[id*=sample-input-]').each(function (this: any) {
        const text = $(this).text();
        sampleInput.push(text);
      });
      const sampleOutput: String[] = [];
      $('pre[id*=sample-output-]').each(function (this: any) {
        const text = $(this).text();
        sampleOutput.push(text);
      });
      return {
        problemTitle: problemTitle,
        problemDescription: problemDescriptions,
        problemInput: problemInput,
        problemOutput: problemOutput,
        sampleInput: sampleInput,
        sampleOutput: sampleOutput,
      } as BojProblemInfo;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };
}
