desc "Build cache.js to cache.min.js"
task :build do
  `closure --js=cache.js --compilation_level=ADVANCED_OPTIMIZATIONS --js_output_file=cache.min.js --warning_level=QUIET`
  `git commit cache.min.js -m "Closure compiled \`git rev-parse HEAD\`"`
end