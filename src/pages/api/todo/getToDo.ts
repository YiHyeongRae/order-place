import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../../common/config/db");

export default async function getToDo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req get to do", req.query.id);
  db.query(
    `SELECT * FROM op_todo WHERE user_id="${req.query.id}"`,
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
