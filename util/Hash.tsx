import axios from "axios";
import SHA256 from "crypto-js/sha256";

import crypto from "crypto";
interface HashModuels {
  makeHash: Function;
}
const Hash: HashModuels = {
  makeHash: async (userId: string, userPw: string) => {
    // console.log("hash에 들어오는 id", userId);
    const res = await axios.post("http://localhost:3000/api/user/getSalt", {
      id: userId,
    });
    // console.log("hash res", res);
    const stretching = 1000;
    if (res.data.length !== 0) {
      const salt = res.data[0].salt;
      return new Promise(async (resolve, reject) => {
        crypto.pbkdf2(
          userPw,
          salt,
          stretching,
          64,
          "sha512",
          (err: any, key: any) => {
            if (err) reject(err);
            resolve(key.toString("base64"));
          }
        );
      });
    } else {
      return null;
    }
  },
};

export default Hash;
