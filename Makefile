# Git credentials to be used by CI.
GIT_USER = aczietlow
GIT_EMAIL = aczietlow@gmail.com

# This is the branch that should be considered production. (PLEASE DON'T TOUCH THIS)
GIT_PUBLISH_BRANCH = master

# This is the repository and branch to which the generated files will be pushed.
GIT_LIVE_URL = https://github.com/aczietlow/hugo-blog.git
GIT_LIVE_BRANCH = gh-pages

sculpin_prod:
	# Build Sculpin itself
	hugo deploy

publish:
	# Tell GitHub that this is not a Jekyll project.
	touch public/.nojekyll

	# Create a new repo for the build directory, then push that repo to live.
	# Because the first command changes the working directory we need to chain
	# all of them together into a single statement as far as the shell is concerned,
	# because each statement runs in its own shell instance.
	cd public && \
	git init && \
	git config user.name '$(GIT_USER)' && \
	git config user.email '$(GIT_EMAIL)' && \
	git add . && \
	git commit -m 'Build website' && \
	git push "$(GIT_LIVE_URL)" -f master:$(GIT_LIVE_BRANCH)