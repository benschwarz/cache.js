desc "Compile and commit new build to git"
task :build => [:compile, :commit_build]

desc "Build cache.js to cache.min.js"
task :compile do
  `closure --js=cache.js --compilation_level=SIMPLE_OPTIMIZATIONS --js_output_file=cache.min.js --warning_level=QUIET`
end

task :commit_build do
  `git commit cache.min.js -m "Closure compiled \`git rev-parse HEAD\`"`
end

desc "Run the test suite"
task :test do
  `open -a Safari test/suite.html`
end