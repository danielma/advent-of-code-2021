ls *.ts | entr -c deno test day$1.test.ts --allow-read
