import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import cheerio from 'cheerio';
import { json } from 'body-parser';

let oldWrite: string = '';
export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

interface data {
  title: string;
  content: string;
  imgSrc: string;
  academy: string;
  message: string;
  people: Array<string>;
  isReaded: boolean;
}

class Crowller {

  private filePath = path.resolve(__dirname, '../../data/data.json');
  private rawHtml = '';
  private the_people: Array<string> = ["陈宁",
    "裴仰军",
    "周伟",
    "陈国荣",
    "利节",
    "陈刘奎",
    "都进学",
    "冯骊骁",
    "祝华正",
    "张倩",
    "彭军",
    "翟渊",
    "于安宁",
    "姚瑶",
    "金尚柱",
    "屈治华",
    "胡燕",
    "张咪",
    "周召敏",
    "周述敏",
    "杨怡康",
    "晏丹",]
  private arr: Array<data> = [];
  private oldWrite: Array<string> = [];
  private cnt = 178;
  private getLiArray(html: string) {
    const $ = cheerio.load(html);
    let LiArrays: Array<Cheerio> = [];

    LiArrays.push($('.ny_list').children('ul').children('li'));
    LiArrays.forEach((item, index) => {
      item.map((index, element) => {
        const title: string | undefined = $(element).find('a').attr('href');
        const aaa: Array<string> | undefined = title?.split('/');

        const flag = $(element).find('span').text();
        if (flag.includes('智能技术与工程学院')) {
          let ResultArr: Array<data> | undefined;
          if (aaa && aaa[0] === '..') {
            const bbb: Array<string> | undefined = title?.split('/');
            let articleUrl = '';
            if (bbb) {
              if (bbb[5]) {
                articleUrl = `https://www.cqust.edu.cn/info/${bbb[4]}/${bbb[5]}`;
              } else if (bbb[4]) {
                articleUrl = `https://www.cqust.edu.cn/info/${bbb[3]}/${bbb[4]}`;
              }
              try {
                superagent.get(articleUrl).then((res) => {
                  const $ = cheerio.load(res.text);
                  const temp: data = { content: '', title: '', imgSrc: '', academy: '', message: '', people: [], isReaded: false };
                  temp.title = $('.news_ny_left h2').text();
                  temp.message = $('.news_ny_left .message').text();
                  temp.content = $('.news_ny_left .main').text();
                  temp.imgSrc = `https://www.cqust.edu.cn/${$('.news_ny_left .main img').attr('src')}`;
                  temp.isReaded = false;
                  if (temp.content.includes('智能技术与工程学院')
                    || temp.title.includes('智能技术与工程学院')) {
                    temp.academy = '智能技术与工程学院';
                  }
                  this.the_people.forEach((item, index) => {
                    if (temp.academy === '智能技术与工程学院' && (temp.content.includes(item)
                      || temp.title.includes(item))) {
                      temp.people.push(item);
                      if (temp.isReaded === false) {
                        this.writeFile(temp);
                        temp.isReaded = true;
                      }
                    }
                  });

                })
              } catch (e) { }
            }

          }
        }

      });
    })




  }

  private async getRawHtml() {
    while (this.cnt >= 0) {
      let url;
      url = `https://www.cqust.edu.cn/index/xww/xxyw/${this.cnt}.htm`;
      if (this.cnt === 178) {
        url = `https://www.cqust.edu.cn/index/xww/xxyw.htm`;
      }

      try {
        const result = await superagent.get(url);
        this.rawHtml = result.text;
        this.getLiArray(this.rawHtml);
        this.cnt = this.cnt - 1;
      } catch (e) {
      }
    }

  }

  private writeFile(content: data) {
    this.arr.push(content);
    Array.from(new Set(this.arr));
    fs.writeFileSync(this.filePath, JSON.stringify(this.arr));

    return JSON.stringify(this.arr)
  }

  private async initSpiderProcess() {
    await this.getRawHtml();
  }

  constructor() {
    this.initSpiderProcess();
    // this.the_people = the_people;
  }
}

export default Crowller;
