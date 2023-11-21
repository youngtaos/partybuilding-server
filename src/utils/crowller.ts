import superagent from 'superagent';
import cheerio from 'cheerio';
const schedule = require('node-schedule');
const connection = require('../mysql/db')

interface data {
  title: string;
  content: string;
  imgSrc: string;
  academy: string;
  message: string;
  people: Array<string>;
  isReaded: boolean;
  articleUrl: string;
}

class Crowller {
  private rawHtml = '';
  public arr: Array<data> = [];
  public isfinished = false;
  public cnt = 180;
  private point = 'xxyw.htm'
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
                  const temp: data = { content: '', title: '', imgSrc: '', academy: '', message: '', people: [], isReaded: false, articleUrl: '' };
                  temp.title = $('.news_ny_left h2').text();
                  temp.message = $('.news_ny_left .message').text();
                  temp.content = $('.news_ny_left .main').text() || '';
                  temp.imgSrc = `https://www.cqust.edu.cn/${$('.news_ny_left .main img').attr('src')}`;
                  temp.isReaded = false;
                  temp.articleUrl = articleUrl;
                  if (temp.content.includes('智能技术与工程学院')
                    || temp.title.includes('智能技术与工程学院')) {
                    temp.academy = '智能技术与工程学院';
                  }
                  this.the_people.forEach((item, index) => {
                    if (temp.academy === '智能技术与工程学院' && (temp.content.includes(item)
                      || temp.title.includes(item))) {
                      temp.people.push(item);
                      if (temp.isReaded === false) {
                        this.arr.push(temp);
                        temp.isReaded = true;
                      }
                    }
                  });

                }).catch((e) => {
                  throw (e)
                })
              } catch (e) { throw (e) }
            }

          }
        }

      });
    })
    return this.arr;
  }

  private async getRawHtml() {
    const result = await superagent.get(`https://www.cqust.edu.cn/index/xww/xxyw.htm`);
    this.rawHtml = result.text;
    const $ = cheerio.load(this.rawHtml);
    this.getLiArray(this.rawHtml);
    const point = $('.ny_list').children('div').children('span').find('.p_next').find('a').attr('href')
    this.cnt = parseInt(point.split('/')[1].split('.')[0]);

    let rule = new schedule.RecurrenceRule();
    rule.second = [0, 10, 20, 30, 40, 50];
    console.log('开始爬取');
    return new Promise(() => {
      let job = schedule.scheduleJob(rule, async () => {
        while (this.cnt >= 1) {
          let url = `https://www.cqust.edu.cn/index/xww/xxyw/${this.cnt}.htm`;
          const result = await superagent.get(url);
          this.rawHtml = result.text;
          this.getLiArray(this.rawHtml);
          console.log(this.cnt)
          this.cnt = this.cnt - 1;
        }
        if (this.cnt < 0) {
          console.log('爬取成功');
          this.writeFile()
          job.cancel();
        }

      })
    })
  }

  public writeFile() {
    Array.from(new Set(this.arr));
    connection.query(`TRUNCATE TABLE Aschema `);
    this.arr.forEach((item: any) => {
      connection.query(`insert into Aschema(id, content, title, imgSrc, academy, message, people, articleUrl) values(0,?,?,?,?,?,?,?);`,
        [item.content, item.title, item.imgSrc, item.academy, item.message, JSON.stringify(item.people), item.articleUrl], function (err: any, result: any) {
          if (err) {
            throw err;
          }
        });
      connection.query(`select count(people) as num  from aschema WHERE people like '%${item.people}%';`, function (err: any, result: any) {
        const res = result[0];
        connection.query(`update People set articleNum = ? where name like '${item.people}'`, [res.num], function (err: any, result: any) {
          if (err) {
            throw err;
          }
        })
      })

    })
  }

  public async initSpiderProcess() {
    this.getRawHtml().then(() => {
      this.isfinished = true;
      console.log('finished', this.isfinished);
    })
  }

  public async getAns() {
    return this.arr;
  }
  constructor(private the_people: Array<string>) {
    this.the_people = the_people;
  }
}

export default Crowller;
