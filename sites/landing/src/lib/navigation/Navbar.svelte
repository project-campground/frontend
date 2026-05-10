<script lang="ts" module>
    import { defineMessages } from "@formatjs/svelte-intl";

    const localeFeatures = defineMessages({
        "landing.features": {
            id: "landing.features",
            defaultMessage: "Features",
            description: "The features page in landing."
        }
    });
</script>
<script lang="ts">
	import { FormattedMessage } from "@campground/locale";
    import { BrandLogo } from "@campground/ui";
</script>

<nav class="Navbar">
    <ul>
        <li>
            <a href="/">
                <BrandLogo size="md" />
            </a>
        </li>
        <li>
            <a href="/features">
                <FormattedMessage {...localeFeatures["landing.features"]} />
            </a>
        </li>
    </ul>
</nav>