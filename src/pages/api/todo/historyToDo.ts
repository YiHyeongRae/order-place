import type { NextApiRequest, NextApiResponse } from "next";
import getInsertValues from "../../../../util/getInsertValues";
const db = require("../../../../common/config/db");

export default async function historyToDo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("history", req.body);
  const values = getInsertValues(req.body.data, req.body.date);
  console.log(values);
  console.log("body.data", req.body.data);
  db.query(
    `INSERT INTO op_history (name,quantity,price,order_date) VALUES${values}`,
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
