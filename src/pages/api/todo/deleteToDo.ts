import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../../common/config/db");

export default async function deleteToDo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("body.data", req.body.data);
  db.query(
    `DELETE FROM op_todo WHERE no IN (${req.body.data})`,
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
