import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../../common/config/db");

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  // console.log("login api", req.body.data);
  db.query(
    `SELECT * FROM op_user WHERE user_id="${req.body.data.id}" AND salt_pw="${req.body.data.pw}"`,
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
