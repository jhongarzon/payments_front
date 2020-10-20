echo "Uploading sourcemaps"
sentry-cli releases -p  files 1 upload-sourcemaps ./maps --no-rewrite