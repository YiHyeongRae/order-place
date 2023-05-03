import type { NextApiRequest, NextApiResponse } from "next";
import splitValues from "../../../../util/splitValues";
const db = require("../../../../common/config/db");

export default async function addCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log("add Category", req.body.data);

  const values = await splitValues(req.body.data);
  // console.log("++++", values.toString(), "++++");
  // console.log("getCategory REQ", req);
  db.query(
    `INSERT INTO op_category (name,link,category,user_id) VALUES ${values.toString()}`,
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
