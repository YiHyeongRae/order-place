import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../common/config/db");

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  db.query(`SELECT * FROM op_user`, function (err: any, result: any) {
    if (err) {
      // console.log("에러는 ?", err);
      res.send(err);
    } else {
      // console.log("결과는 ?", result);
      res.json(result);
    }
  });
}
