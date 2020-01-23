REM "Build dist/ with bordeaux dependencies for node_modules/"

DEL /Y "%CD%\dist"

XCOPY /Y "%CD%\node_modules\bordeaux-backend\dist\backend.js" "%CD%\dist"

XCOPY /Y /S "%CD%\node_modules\bordeaux-frontend\dist" "%CD%\dist"

XCOPY /Y "%CD%\src\frontend.js" "%CD%\dist"
