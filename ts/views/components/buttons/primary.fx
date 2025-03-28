<button $if(type) type="$(type)" $endif
  class="$if(style) $(style) $endif cursor-pointer group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-primary-100 px-6 font-medium text-black transition-all duration-100 [box-shadow:5px_5px_rgb(0_0_0)] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_rgb(0_0_0)]">
  $(title)
</button>