Using jsdoc3 to generate javascript documentation with jaguarjs template
1.Install jsdoc node module globaly
    npm install jsdoc@"<=3.3.0" -g
2.Generate the doc
    sudo jsdoc -p -r -t jaguarjs -c /var/www/translation/jsdoc/jaguarjs/conf.json -d /var/www/translation/web/doc /var/www/translation/web/js --verbose