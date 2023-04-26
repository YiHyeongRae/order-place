import type { NextApiRequest, NextApiResponse } from "next";
import getInsertValues from "../../../../util/getInsertValues";
const db = require("../../../../common/config/db");

export default async function addToDo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log("body.data", req.body.data);
  const values = getInsertValues(req.body.data);

  db.query(
    `INSERT INTO op_todo (name,quantity,price,user_id) VALUES${values}`,
    function (err: any, result: any) {
      if (err) {
        // console.log("에러는 ?", err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
}
