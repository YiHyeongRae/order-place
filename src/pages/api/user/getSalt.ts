import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../../common/config/db");

export default async function getSalt(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  db.query(
    `SELECT salt FROM op_user WHERE user_id="${req.body.id}"`,
    function (err: any, result: any) {
      if (err) {
        res.send(err);
      } else {
        // console.log("결과는 ?", result);
        res.json(result);
      }
    }
  );
}
