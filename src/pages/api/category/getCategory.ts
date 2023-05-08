import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../../common/config/db");

export default async function getCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log("getCategory REQ", req.body);
  db.query(
    `SELECT * FROM op_category WHERE user_id="${req.query.id}"`,
    function (err: any, result: any) {
      if (err) {
        // console.log("에러는 ?", err);
        res.send(err);
      } else {
        // console.log("결과는 ?", result);
        res.json(result);
      }
    }
  );
}
