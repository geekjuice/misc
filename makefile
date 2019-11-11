BUILD = "lib"
INDEX = "index.js"
ESLINT_FILES = "**/*.{js,ts}"
PRETTIER_FILES = "**/*.{js,json,md,ts}"

DONE = echo [misc] ✓ $@ done

.PHONY: default
default:
	echo "Please enter a command..."
	$(DONE)

$(verbose).SILENT:

.PHONY: clean
clean:
	rm -rf $(BUILD)
	$(DONE)

.PHONY: wipe
wipe: clean
	rm -rf node_modules
	$(DONE)

.PHONY: install
install: wipe
	npm install
	npm audit fix
	$(DONE)

.PHONY: lint
lint:
	npm run eslint -- \
		--ignore-path .gitignore \
		$(ESLINT_FILES)
	$(DONE)

.PHONY: format
format:
	npm run prettier -- \
		--ignore-path .gitignore \
		--write $(PRETTIER_FILES)
	$(DONE)

.PHONY: test
test:
	npm run jest
	$(DONE)

.PHONY: dev
dev: clean
	npm run tsc -- \
		--watch
	$(DONE)

.PHONY: build
build: clean
	npm run tsc
	$(DONE)

.PHONY: start
start:
	node $(INDEX)
	$(DONE)

.PHONY: link
link: build
	npm link
	$(DONE)
