src      := contracts/templates
dst      := contracts/libs
patterns := $(file < patterns.txt)

all: $(patterns)

target:
	@mkdir -p $(dst)

clear:
	@rm -fv $(dst)/*

LibSet.%.sol: $(src)/LibSet.sol.templated target
	@sed -e 's/TYPE_VALUE/$(word 2, $(subst ., ,$@))/g;' $< > $(dst)/$@
	@echo "→ $@ generated"

LibMap.%.sol: $(src)/LibMap.sol.templated target
	@sed -e 's/TYPE_KEY/$(word 2, $(subst ., ,$@))/g; s/TYPE_VALUE/$(word 3, $(subst ., ,$@))/g' $< > $(dst)/$@
	@echo "→ $@ generated"

%.sol:
	@echo "Not template recognised for $@"
