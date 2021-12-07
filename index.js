#!/usr/bin/env node
const chalk = require("chalk");
const ora = require("ora");
const axios = require("axios");
const { getInstalledPath } = require("get-installed-path");
const { prompt, Separator } = require("inquirer");
const { type } = require("os");
const { spawn } = require("child_process");
const { promises } = require("fs");

(async function main() {
  let aswr;
  let repoCreated = false;
  const oraInstace = ora({
    stream: process.stdout,
  });

  async function checkConfig() {
    await getInstalledPath("@vue");
    if (type() !== "Darwin") throw new Error("Only accessible on macOS for now.");
  }

  async function questions() {
    aswr = await prompt([
      {
        type: "confirm",
        message: chalk`Create new repo at this path ? ${new Separator(process.cwd())}`,
        name: "start",
      },
      {
        type: "input",
        message: "What is your github account name ?",
        name: "githubName",
        when: (answer) => !!answer.start,
        validate: (answer) => !!answer.length,
      },
      {
        type: "input",
        message: "Name of your new repo",
        name: "githubRepoName",
        when: (answer) => !!answer.start,
        validate: (answer) => !!answer.length,
      },
      {
        type: "input",
        message: `In order to create a repo we need a token created by github, we don't store any datas. ${new Separator(
          chalk`more informations here {cyan https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token}`
        )}`,
        name: "githubToken",
        when: (answer) => !!answer.start,
        validate: (answer) => !!answer.length,
      },
    ]);

    if (!aswr.start)
      throw new Error("Go to the folder where you want create fast-mvp template");
  }

  async function run() {
    oraInstace.start(chalk`{cyan Create new repo with fast-mvp template}`);
    const newRepo = await axios.post(
      "https://api.github.com/repos/luctst/fast-mvp/generate",
      { owner: aswr.githubName, name: aswr.githubRepoName },
      {
        headers: {
          accept: "application/vnd.github.v3+json",
          "User-Agent": aswr.githubName,
          Authorization: `token ${aswr.githubToken}`,
        },
      }
    );

    repoCreated = true;

    return new Promise((resolve, reject) => {
      const firstSubProcess = spawn(`git clone ${newRepo.data.ssh_url}`, [], {
        cwd: process.cwd(),
        shell: true,
      });

      firstSubProcess
        .on("error", (error) => reject(error))
        .on("close", (code) => {
          if (code === 0) {
            const subProcess = spawn(`vue create project`, ["-d"], {
              cwd: `${process.cwd()}/${aswr.githubRepoName}/client`,
              shell: true,
            });

            subProcess.stdout.setEncoding("utf-8");
            subProcess.stdout.on("data", (data) => console.log(data));

            subProcess
              .on("error", async (error) => {
                await promises.rm(`${process.cwd()}/${aswr.githubRepoName}`, {
                  recursive: true,
                  force: true,
                });
                reject(error);
              })
              .on("close", async (code) => {
                if (code === 0)
                  resolve(
                    oraInstace.succeed("Done you can now run docker-compose up -d")
                  );

                await promises.rm(`${process.cwd()}/${aswr.githubRepoName}`, {
                  recursive: true,
                  force: true,
                });
                reject(new Error("Cannot create vue app with vue-cli."));
              });
          }

          reject(new Error("Cannot clone fast-mvp repo"));
        });
    });
  }

  try {
    await checkConfig();
    await questions();
    await run();
  } catch (error) {
    if (repoCreated) {
      oraInstace.text = "Error detected, delete fresh new repo";
      await axios.delete(
        `https://api.github.com/repos/${aswr.githubName}/${aswr.githubRepoName}`,
        {
          headers: {
            accept: "application/vnd.github.v3+json",
            "User-Agent": aswr.githubName,
            Authorization: `token ${aswr.githubToken}`,
          },
        }
      );
    }

    let errorMessage;

    if (error.response) {
      if (error.response.data.errors) {
        errorMessage = error.response.data.errors[0];
      } else {
        errorMessage = error.response.data.message;
      }
    } else {
      errorMessage = error.message;
    }

    if (oraInstace.isSpinning) {
      oraInstace.fail(chalk`{red ${errorMessage}}`);
      return process.exit(-1);
    }

    process.stderr.write(chalk`{red ${errorMessage}}`);
    return process.exit(-1);
  }
})();
